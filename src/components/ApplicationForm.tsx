import { useRef, useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type ApplicationData = {
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  role: string;
};

interface ApplicationFormProps {
  jobTitle: string;
  initialData?: ApplicationData;
  onContinue: (data: ApplicationData) => void;
  onCancel: () => void;
}

const ApplicationForm = ({
  jobTitle,
  onContinue,
  initialData,
  onCancel,
}: ApplicationFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialData?.name ?? '');
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [phone, setPhone] = useState(initialData?.phone ?? '');
  const [resume, setResume] = useState<File | null>(
    initialData?.resume ?? null
  );
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    resume?: string;
  }>({});

  const handleResumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const newErrors = { ...errors };
    delete newErrors.resume;

    if (file.type !== 'application/pdf') {
      newErrors.resume = 'Please upload a PDF resume.';
      setErrors(newErrors);
      event.target.value = '';
      setResume(null);
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      newErrors.resume = 'Resume must be smaller than 5 MB.';
      setErrors(newErrors);
      event.target.value = '';
      setResume(null);
      return;
    }

    setErrors(newErrors);
    setResume(file);
  };

  const removeResume = () => {
    setResume(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      resume?: string;
    } = {};

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      newErrors.name = 'Full name is required.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

    if (!trimmedPhone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(trimmedPhone)) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!resume) {
      newErrors.resume = 'Please upload your resume.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onContinue({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      resume,
      role: jobTitle,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">
          Apply for this position
        </h2>

        <p className="text-muted-foreground mt-1">
          Complete your details before starting the job quiz.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="application-role">Role</Label>

          <Input
            id="application-role"
            value={jobTitle}
            readOnly
            className="bg-muted/50"
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="application-name">
            Full Name
          </Label>

          <Input
            id="application-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);

              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: undefined }));
              }
            }}
            placeholder="Enter your full name"
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="application-email">
            Email
          </Label>

          <Input
            id="application-email"
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);

              if (errors.email) {
                setErrors((prev) => ({ ...prev, email: undefined }));
              }
            }} placeholder="Enter your email"
            autoComplete="email"
            aria-invalid={!!errors.email}

          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="application-phone">
            Phone Number
          </Label>

          <Input
            id="application-phone"
            type="tel"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);

              if (errors.phone) {
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }
            }}
            placeholder="Enter your phone number"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>

        {/* Resume */}
        <div className="space-y-2">
          <Label>Resume</Label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleResumeChange}
            className="hidden"
          />

          {!resume ? (
            <>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-xl p-6
                         flex flex-col items-center justify-center gap-2
                         text-muted-foreground hover:border-primary/50
                         hover:bg-primary/5 transition-colors"
              >
                <Upload className="w-6 h-6" />

                <span className="font-medium text-foreground">
                  Upload Resume
                </span>

                <span className="text-xs">
                  PDF files only
                </span>
              </button>
              {errors.resume && (
                <p className="text-sm text-destructive">{errors.resume}</p>
              )}
            </>
          ) : (
            <div className="flex items-center justify-between gap-3
                            border border-border rounded-xl p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10
                                flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">
                    {resume.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={removeResume}
                aria-label="Remove resume"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row
                        justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="btn-primary"
          >
            Continue to Quiz
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;