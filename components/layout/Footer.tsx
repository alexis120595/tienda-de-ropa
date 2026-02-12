export default function Footer() {
  return (
    <footer className="border-t mt-auto bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Vivere Ex Animo. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
