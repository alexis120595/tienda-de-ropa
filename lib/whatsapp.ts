export const generateWhatsAppLink = (adminPhone: string, orderData: {
  user: { name: string; email: string; phone?: string };
  items: { name: string; quantity: number; price: number; size?: string }[];
  total: number;
}) => {
  const baseUrl = "https://wa.me/";
  // Limpiar el teléfono de caracteres no numéricos
  const phone = adminPhone.replace(/[^0-9]/g, "");
  
  const itemsList = orderData.items
    .map(i => `• ${i.name} ${i.size ? `(Talle ${i.size})` : ''} x${i.quantity} - $${(i.price * i.quantity).toLocaleString('es-AR')}`)
    .join('%0A');

  const text = `*¡Hola! Nuevo Pedido Web* 🛍️%0A%0A` +
    `*Cliente:* ${orderData.user.name}%0A` +
    `*Email:* ${orderData.user.email}%0A` +
    (orderData.user.phone ? `*Tel:* ${orderData.user.phone}%0A` : '') +
    `%0A*Detalle del Pedido:*%0A${itemsList}%0A%0A` +
    `*TOTAL: $${orderData.total.toLocaleString('es-AR')}*`;

  return `${baseUrl}${phone}?text=${text}`;
};
