import { db } from '@/auth/db'

export async function fetchTotalOrders() {
  const data = await db.order.count() // Counts the total number of orders
  
  return data;
}

export async function fetchTotalRevenue() : Promise<number> {
  const data = await db.order.aggregate({
    _sum: {
      pricePaidInCents: true, // Sums the total price of all orders
    },
  })
  
  return data._sum.pricePaidInCents ? data._sum.pricePaidInCents : 0;
}

export async function fetchTotalProductsSold() {
  const data = await db.productOrder.count() // Counts the total number of products sold per order
  
  return data;
}

export async function fetchTotalUsers() : Promise<number> {
  const data = await db.user.count()

  return data || 0;
}

export async function fetchUserByEmail(email: string | undefined) {
  const data = await db.user.findUnique({
    where: {
      email: email,
    }
  })

  return data;
}

export async function fetchProducts(){
  const data = await db.product.findMany({
    select: {
      id: true,
      name: true,
      imagePath: true,
      priceInCents: true,
      isAvailable: true,
      numberOfStock: true,
      _count: { select: { ProductOrder: true}}
    },
    orderBy: { name: 'asc' }
  })

  return data;
}

export async function fetchProductById(id: string){
  const data = await db.product.findUnique({
    where: {
      id: id
    }
  })

  return data;
}