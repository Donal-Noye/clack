export function KeyboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-8">
      {children}
    </div>
  );
}

export function KeyboardViewLayout({
  children,
  actionKeys,
}: {
  children: React.ReactNode;
  actionKeys: React.ReactNode;
}) {
  return (
    <div className="inline-flex flex-col gap-2 py-6 px-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
      {children}
      <div className="flex justify-center gap-2 mt-2">{actionKeys}</div>
    </div>
  );
}

export function TypingTextLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block transition-transform duration-300 ease-out">
      <div className="text-center">{children}</div>
    </div>
  );
}
