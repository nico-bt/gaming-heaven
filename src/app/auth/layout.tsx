export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full bg-black/50 h-[calc(100vh-3.5rem)]">{children}</div>
  );
}
