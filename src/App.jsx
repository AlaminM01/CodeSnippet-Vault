import React from 'react';
import { Button, Badge, Card, Input } from './components/common';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-dark-text p-8 flex flex-col items-center justify-center">
      <Card className="max-w-md w-full text-center space-y-4">
        <div className="flex justify-center gap-2">
          <Badge color="#4f6bf0">Design System Active</Badge>
          <Badge color="#10b981">Tailwind + Framer</Badge>
        </div>
        <h1 className="text-2xl font-bold font-sans tracking-tight">CodeSnippet Vault</h1>
        <p className="text-dark-muted text-sm font-sans">
          Minimalist developer productivity tool for storing, organizing, and managing code snippets.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Browse Snippets</Button>
        </div>
      </Card>
    </div>
  );
}
