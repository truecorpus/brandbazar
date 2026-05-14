import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ivory">
      <div className="text-center px-6">
        <h1 className="text-display text-rich mb-4">Page Not Found</h1>
        <p className="text-body-lg text-charcoal max-w-md mx-auto mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  );
}
