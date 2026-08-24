import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BookOpen, ExternalLink, Trash2, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import DashboardNavbar from '@/components/DashboardNavbar';


interface Resource {
  id: string;
  topic: string;
  title: string;
  url: string | null;
  description: string | null;
  enrolled_at: string;
}

const ResourcesList = () => {
  const { userProfile, isLoading } = useUser();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = useState(false);


  useEffect(() => {
    if (!isLoading && !userProfile) {
      navigate('/');
    }
  }, [userProfile, isLoading, navigate]);

  useEffect(() => {
    if (userProfile) {
      fetchResources();
    }
  }, [userProfile]);

  const fetchResources = async () => {
    if (!userProfile) return;

    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('user_profile_id', userProfile.id)
        .order('enrolled_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:');
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id: string) => {
    try {
      const { error } = await supabase.from('resources').delete().eq('id', id);
      if (error) throw error;
      setResources((prev) => prev.filter((r) => r.id !== id));
      toast({ title: 'Resource removed successfully' });
    } catch (error) {
      toast({ title: 'Failed to remove resource', variant: 'destructive' });
    }
  };

  // Group resources by topic
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.topic]) {
      acc[resource.topic] = [];
    }
    acc[resource.topic].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Learning Resources - Dashboard</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        <DashboardNavbar />
        <DashboardSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <main className={`ml-0 ${isCollapsed ? 'lg:ml-[100px]' : 'lg:ml-[280px]'} transition-all duration-300 pt-24 pb-12`}>
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="min-w-0">
                <h1 className="text-2xl font-bold text-primary">
                  Learning Resources
                </h1>

                <p className="text-muted-foreground">
                  Resources you've saved for learning
                </p>
              </div>

              <Button
                asChild
                className="btn-primary w-full sm:w-auto shrink-0"
              >
                <Link to="/resume-builder">
                  Create Resume
                </Link>
              </Button>
            </div>

            {resources.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-12 text-center"
              >
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">No resources saved</h3>
                <p className="text-muted-foreground mb-6">Get personalized learning recommendations</p>
                <Button asChild className="btn-primary">
                  <Link to="/resources">Find Resources</Link>
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedResources).map(([topic, topicResources]) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-secondary" />
                      {topic}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {topicResources.map((resource, index) => (
                        <motion.div
                          key={resource.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="glass-card-hover p-5"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-medium text-primary flex-1">{resource.title}</h3>
                            <div className="flex gap-1">
                              {resource.url && (
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              <button
                                onClick={() => deleteResource(resource.id)}
                                className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {resource.description && (
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {resource.description}
                            </p>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(resource.enrolled_at).toLocaleDateString()}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ResourcesList;
