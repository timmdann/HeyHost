type Props = {
  children: React.ReactNode
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-white text-black">
      {children}
    </div>
  );
}
