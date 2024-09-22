import Navbar from "@/components/admin/shared/navbar/Navbar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <div className="container">
        {children}
        </div>
    </div>
)
}
