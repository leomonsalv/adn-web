import { Product } from '@/types/product';
import { GlobeAmericasIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt:
            'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};
export const breadcrumbs = [{ id: 1, name: 'Men', href: '#' }];
export const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals' },
      { value: 'tees', label: 'Tees' },
      { value: 'crewnecks', label: 'Crewnecks' },
      { value: 'sweatshirts', label: 'Sweatshirts' },
      { value: 'pants-shorts', label: 'Pants & Shorts' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
];

export const footerNavigation = {
  categories: [
    {
      name: 'Farmacia',
      href: '/farmacia',
    },
    {
      name: 'Belleza',
      href: '/belleza',
    },
    {
      name: 'Comestibles',
      href: '/comestibles',
    },
    {
      name: 'Cuidado personal',
      href: '/cuidado-personal',
    },
    {
      name: 'Bebés',
      href: '/bebes',
    },
    {
      name: 'Hogar',
      href: '/hogar',
    },
  ],

  more: [
    {
      name: 'Su cuenta',
      href: '#',
    },
    {
      name: 'Pedidos anteriores',
      href: '#',
    },
    {
      name: 'Centro de ayuda',
      href: '#',
    },
  ],

  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
    { name: 'Objects', href: '#' },
    { name: 'Home Goods', href: '#' },
    { name: 'Accessories', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Secure Payments', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
  ],
  translations: [
    { label: 'Espanol', value: 'spanish' },
    { label: 'Ingles', value: 'english' },
    { label: 'Frances', value: 'french' },
  ],
};

export const products: Product[] = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '1',
    price: '$256',
    description:
      'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: '8 colors',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt:
      'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '2',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: 3,
    name: 'Classic Crewneck Sweatshirt',
    href: '3',
    price: '$68',
    description:
      'A classic crewneck sweatshirt for those chilly days. Soft, comfortable, and versatile.',
    options: '3 colors',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-03.jpg',
    imageAlt: 'Three folded crewneck sweatshirts in grey, blue, and black.',
  },
  {
    id: 4,
    name: 'Relaxed Fit Jeans',
    href: '4',
    price: '$89',
    description:
      'These relaxed fit jeans are perfect for casual days and can be paired with anything.',
    options: 'Denim Blue',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-04.jpg',
    imageAlt: 'Pair of relaxed fit jeans in denim blue.',
  },
  {
    id: 5,
    name: 'Waterproof Jacket',
    href: '5',
    price: '$120',
    description:
      'Stay dry and stylish with our waterproof jacket, designed to withstand the elements.',
    options: '2 colors',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-05.jpg',
    imageAlt: 'Waterproof jacket in black and yellow.',
  },
  {
    id: 6,
    name: 'Canvas Tote Bag',
    href: '6',
    price: '$45',
    description: 'A durable and spacious canvas tote bag, perfect for daily errands and shopping.',
    options: 'Natural',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg',
    imageAlt: 'Canvas tote bag in natural color with leather handles.',
  },
  {
    id: 7,
    name: 'Athletic Shorts',
    href: '7',
    price: '$30',
    description:
      'Breathable athletic shorts for all your workout needs. Lightweight and comfortable.',
    options: '4 colors',
    imageSrc:
      'https://canary.contestimg.wish.com/api/webimage/5dd74abdea2ad2b7263c61ce-large.jpg?cache_buster=86fa8816aae30b14beaa599427fa71d2',
    imageAlt: 'Athletic shorts in black, blue, grey, and red.',
  },
  {
    id: 8,
    name: 'Wool Beanie',
    href: '8',
    price: '$25',
    description: 'Keep your head warm with our classic wool beanie. Perfect for cold weather.',
    options: '3 colors',
    imageSrc:
      'https://i5.walmartimages.com/seo/Cute-Plush-Beanie-for-Women-Girl-Funny-Sausage-Mouth-Monster-Beanie-Hat-Winter-Warm-Hat-Cartoon-Big-Eyes-Creative-Party-Hat_351e869b-3d9c-48e9-a24b-98e5b5a7083f.f78202269d5697a44babb760c0df24ed.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
    imageAlt: 'Wool beanie in grey, navy, and black.',
  },
  {
    id: 9,
    name: 'Batman suit',
    href: '9',
    price: '$78',
    description: 'Be the batman you always wanted to be.',
    options: '2 colors',
    imageSrc:
      'https://media.simcosplay.com/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/t/h/the_batman_2021_cosplay_costumes_leather_batsuit_for_halloween_superhero_cosplay_1.jpg',
    imageAlt: 'Feel like a batman.',
  },
  {
    id: 10,
    name: 'Leather Belt',
    href: '10',
    price: '$40',
    description:
      'A classic leather belt that complements any outfit. Made with high-quality leather.',
    options: 'Brown, Black',
    imageSrc:
      'https://www.funny-western.co.jp/products-retina/638/510/2022/05/Belt_Basic_Harness-MB_hp.jpg',
    imageAlt: 'Leather belts in brown and black.',
  },
];

export const product = {
  id: 6,
  name: 'Basic Tee',
  price: '$35',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Women', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      id: 1,
      imageSrc:
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-product-shot-01.jpg',
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-product-shot-02.jpg',
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    {
      name: 'Heather Grey',
      bgColor: 'bg-gray-400',
      selectedColor: 'ring-gray-400',
    },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: false },
  ],
  description: `
    <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
    <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
  `,
  details: [
    'Only the best materials',
    'Ethically and locally made',
    'Pre-washed and pre-shrunk',
    'Machine wash cold with similar colors',
  ],
};
export const policies = [
  {
    name: 'International delivery',
    icon: GlobeAmericasIcon,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

export const categories = [
  { name: 'Todo', href: '/', id: '0' },
  { name: 'Belleza', href: '#', id: '1' },
  { name: 'Bienestar', href: '#', id: '2' },
  { name: 'Botiquín', href: '#', id: '3' },
  { name: 'Cuidado Personal', href: '#', id: '4' },
  { name: 'Bebés', href: '#', id: '5' },
  { name: 'Medicamentos', href: '#', id: '6' },
  { name: 'Alimentos', href: '#', id: '7' },
  { name: 'Bebidas', href: '#', id: '8' },
  { name: 'Hogar', href: '#', id: '9' },
  { name: 'Deporte', href: '#', id: '10' },
  { name: 'Juguetes', href: '#', id: '11' },
  { name: 'Mascotas', href: '#', id: '12' },
  { name: 'Electrónicos', href: '#', id: '13' },
  { name: 'Oficina y Escuela', href: '#', id: '14' },
  { name: 'Ropa', href: '#', id: '15' },
  { name: 'Joyería y accesorios', href: '#', id: '16' },
  { name: 'Referir a un Amigo 🚀', href: '/referidos', id: '17' },
];

export const navbarMenuHover = [
  { name: 'Cuenta', href: '/profile', id: '1' },
  { name: 'Favoritos', href: '#', id: '2' },
  { name: 'Pedidos', href: '/historial', id: '3' },
  { name: 'Tus direcciones', href: '#', id: '4' },
  { name: 'Ajustes', href: '#', id: '5' },
  { name: 'Notificaciones', href: '#', id: '6' },
  { name: 'Centro de ayuda', href: '#', id: '7' },
];

export const testimonials = [
  {
    id: 1,
    quote:
      'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
    attribution: 'Sarah Peters, New Orleans',
  },
  {
    id: 2,
    quote:
      'I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!',
    attribution: 'Kelly McPherson, Chicago',
  },
  {
    id: 3,
    quote:
      'Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.',
    attribution: 'Chris Paul, Phoenix',
  },
];

export const offers = [
  {
    name: 'Download the app',
    description: 'Get an exclusive $5 off code',
    href: '#',
  },
  {
    name: "Return when you're ready",
    description: '60 days of free returns',
    href: '#',
  },
  {
    name: 'Sign up for our newsletter',
    description: '15% off your first order',
    href: '#',
  },
];

export const trendingProducts = [
  {
    id: 1,
    name: 'Machined Pen',
    color: 'Black',
    price: '$35',
    href: '#',
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/home-page-02-product-01.jpg',
    imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  // More products...
];
