const products = [
  {
    product_name: "T-shirt",
    product_description: "A soft, breathable jersey which is an excellent choice for the warmest day",
    product_price: 500,
    product_image: "https://images.pexels.com/photos/3026284/pexels-photo-3026284.jpeg?_gl=1*1hqd8qg*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1MjczMzIkajU5JGwwJGgw",
    product_category: "Men",
    product_size: "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Polo Shirt",
    product_description: "a piece of clothing that generally has short sleeves",
    product_price: 1500,
    product_image: "https://images.pexels.com/photos/2531355/pexels-photo-2531355.jpeg?_gl=1*rln05z*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1Mjc4NDIkajU5JGwwJGgw",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Flannel shirts",
    product_description: "Made from soft cotton or wool, flannel shirts are often associated with a casual, cozy style",
    product_price: 756,
    product_image: "https://media.istockphoto.com/id/2218333101/photo/confident-mature-man-smiling-in-professional-attire-with-a-calm-background.jpg?b=1&s=612x612&w=0&k=20&c=YiqSkW4r453aZ-1pYJ9h20fXRJG1UWhd5B8QxJfsPIQ=",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Blazers",
    product_description: "versatile, tailored jacket that is designed to be worn on its own, not as part of a matching suit",
    product_price: 2000,
    product_image: "https://images.pexels.com/photos/2662794/pexels-photo-2662794.jpeg?_gl=1*x9zykf*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1Mjg0ODUkajMzJGwwJGgw",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  
   {
    product_name: "Hoodies",
    product_description: "a thick fabric to fight against the cold like jackets and sweatshirts.",
    product_price: 3500,
    product_image: "https://images.pexels.com/photos/30257624/pexels-photo-30257624.jpeg?_gl=1*56ikv6*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1Mjg5MTckajI5JGwwJGgw",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Jeans",
    product_description: "versatile and durable type of trousers made from a sturdy cotton fabric called denim",
    product_price: 928,
    product_image:  "https://media.istockphoto.com/id/1210130241/photo/jumping-male-fashion-model-standing-in-white-plain-v-neck-t-shirt-and-blue-ripped-denim-pant.jpg?b=1&s=612x612&w=0&k=20&c=fkcizN7mw1v3OWE0JVs91Bg18jc4HxzYjsyf0TYlSzU=",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Cargo pants",
    product_description: "style of loosely-cut pants originally designed for tough work environments",
    product_price: 1765,
    product_image: "https://media.istockphoto.com/id/1357884956/photo/man-wearing-cargo-pants-with-hand-in-pocket-on-grey-background.jpg?b=1&s=612x612&w=0&k=20&c=ti8rf4UZWep29jBZKhwV4MKSsTGJ8SCElIKDESK8zvU=",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Track pants",
    product_description: "lightweight, athletic-inspired trousers designed for comfort, flexibility, and style",
    product_price: 1432,
    product_image:  "https://media.istockphoto.com/id/1250426834/photo/young-man-running-over-the-puddle-by-the-garages.jpg?b=1&s=612x612&w=0&k=20&c=mnZJIJr6dhn00bpwIjWD_1W80Laxg6rPTz3oMbdacqg=",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Shorts",
    product_description:  "Crafted from a lightweight, breathable cotton blend",
    product_price: 432,
    product_image: "https://images.pexels.com/photos/18394309/pexels-photo-18394309.jpeg?_gl=1*689wxe*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1MzAwMzUkajEwJGwwJGgw",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Chinos",
    product_description: "classic and versatile style of casual trousers",
    product_price: 1642,
    product_image:  "https://images.pexels.com/photos/23910819/pexels-photo-23910819.jpeg?_gl=1*1fcuh2n*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1MzAxNDUkajU5JGwwJGgw",
    product_category: "Men",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },

  // -------------------- WOMEN PRODUCTS --------------------
  {
    product_name: "Blouses",
    product_description:  "upper garments that blend sophisticated style with comfort",
    product_price: 2000,
    product_image:  "https://media.istockphoto.com/id/1467314469/photo/portrait-of-beautiful-happy-indian-woman-in-sari-looking-away-and-thinking.jpg?b=1&s=612x612&w=0&k=20&c=I4BwQOzSkoyPaJQeF-nbBi9ftytz2daufQmzFyoDA0s=",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Shirts",
    product_description: "Elevate your everyday style with our versatile collection of women's tops",
    product_price: 925,
    product_image: "https://media.istockphoto.com/id/956415078/photo/portrait-of-successful-businesswoman-in-office.jpg?b=1&s=612x612&w=0&k=20&c=JkwWNIbXW9f5pexYEQUPaXQ7HcPyP7N4NfA-cJIxJ_s=",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Crop tops",
    product_description:  "Elevate your everyday style with our versatile collection of women's tops",
    product_price: 3000,
    product_image: "https://images.pexels.com/photos/11400112/pexels-photo-11400112.jpeg?_gl=1*197fy5w*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1MzEwODgkajU5JGwwJGgw",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "Out-of-Stock"
  },
  {
    product_name: "T-shirts",
    product_description: "everyday style with our collection of women's T-shirts",
    product_price: 793,
    product_image: "https://images.pexels.com/photos/13769364/pexels-photo-13769364.jpeg?_gl=1*1j3v1ya*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1MjcxNjgkbzMkZzEkdDE3NjQ1MzEzNTkkajU5JGwwJGgw",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
{
    product_name: "Sweatshirts",
    product_description:  "Made from a soft and breathable fabric for maximum comfort and durability.",
    product_price: 608,
    product_image: "https://media.istockphoto.com/id/1253067256/photo/getting-ready-to-go-out.jpg?b=1&s=612x612&w=0&k=20&c=Le9CVU0UHCWUfUQrrfBsQ0EvQlI_XS1nW6GNh8JobeM=",
    product_category: "Women",
    product_size: "S,M,L,XL",
    product_stock: "In-Stock"
  },
    {
    product_name: "Sarees",
    product_description: "Every fold tells a story, a testament to the exquisite craftsmanship",
    product_price: 3056,
    product_image:  "https://images.pexels.com/photos/29296968/pexels-photo-29296968.jpeg?_gl=1*zfrwv0*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTU3MjMkajU4JGwwJGgw",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Lehengas",
    product_description:  "a three-piece ensemble that captures the essence of tradition while embracing modern elegance",
    product_price: 4197,
    product_image: "https://images.pexels.com/photos/27212189/pexels-photo-27212189.jpeg?_gl=1*qknliz*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTU4NTgkajU5JGwwJGgw",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Anarkalis",
    product_description: "sophisticated choice in ethnic Indian wear",
    product_price: 3197,
    product_image: "https://images.pexels.com/photos/5922737/pexels-photo-5922737.jpeg?_gl=1*717zf1*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTYwMzckajU5JGwwJGgw",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Sharara sets",
    product_description: "perfect for adding a touch of festive elegance to any occasion",
    product_price: 2638,
    product_image: "https://images.pexels.com/photos/20407233/pexels-photo-20407233.jpeg?_gl=1*49dxoy*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTYyOTYkajU3JGwwJGgw",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Kaftans",
    product_description: "celebrated globally for their effortless blend of comfort and style",
    product_price: 1638,
    product_image: "https://images.pexels.com/photos/6191908/pexels-photo-6191908.jpeg?_gl=1*12dd0u6*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTYzNjUkajU5JGwwJGgw",
    product_category: "Women",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },

  // -------------------- KIDS PRODUCTS --------------------
  {
    product_name: "T-Shirt",
    product_description: "picture is a comfortable choice for any occasion",
    product_price: 438,
    product_image: "https://media.istockphoto.com/id/1369877224/photo/portrait-of-attractive-young-school-boy-white-background-stock-photo.jpg?b=1&s=612x612&w=0&k=20&c=y29AdKXvcircoE5BCsNO53IS_konIu3elJHFjwwZ9rY=",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
    {
    product_name: "Jeans",
    product_description: "ultimate wardrobe essential designed for both style and comfort",
    product_price: 738,
    product_image:  "https://images.pexels.com/photos/10384408/pexels-photo-10384408.jpeg?_gl=1*18xtr6v*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTY5MjckajU5JGwwJGgw",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Trousers",
    product_description: "these performance trousers seamlessly blend athletic functionality with a sleek",
    product_price: 348,
    product_image: "https://images.pexels.com/photos/5560012/pexels-photo-5560012.jpeg?_gl=1*fod2cm*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTcwNTYkajU5JGwwJGgw",
    product_category: "Kids",
    product_size: "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Coats",
    product_description: "crafted from a luxurious blend of virgin wool and cashmere.",
    product_price: 1348,
    product_image: "https://media.istockphoto.com/id/931055460/photo/little-girl-getting-ready-for-school.jpg?b=1&s=612x612&w=0&k=20&c=1L9FsaCHVTvZwmVROrxgjaAMFVWFhR2ooc1qUmNjkzw=",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Skirts",
    product_description: "A sophisticated A-line midi skirt in a rich, structured navy wool blend.",
    product_price: 1148,
    product_image: "https://media.istockphoto.com/id/1294345604/photo/cute-little-girl-having-fun-time-in-the-nature.jpg?b=1&s=612x612&w=0&k=20&c=MopVpcwrP9dXOJiZ42YeVNOeQYYPYpy24sfqek5EU-8=",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Pajamas",
    product_description: "They are crafted from soft, breathable fabrics like cotton",
    product_price: 798,
    product_image: "https://images.pexels.com/photos/34987457/pexels-photo-34987457.jpeg?_gl=1*1kxwnb*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTgwMTAkajU5JGwwJGgw",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "Swimwear",
    product_description: "pecialized category of apparel engineered for aquatic environments",
    product_price: 998,
    product_image: "https://images.pexels.com/photos/7863542/pexels-photo-7863542.jpeg?_gl=1*1q7x0qu*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTgwNzkkajU5JGwwJGgw",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Blazers",
    product_description: "Elevate your professional wardrobe with this immaculately tailored blazer",
    product_price: 1998,
    product_image:  "https://media.istockphoto.com/id/641755680/photo/teen-student-in-the-library.jpg?b=1&s=612x612&w=0&k=20&c=0j_8nFgPHUA4pjLWlYWDo1oNZ26auzimfgrxBgflhzY=",
    product_category: "Kids",
    product_size: "S,M,L,XL",
    product_stock: "In-Stock"
  },
   {
    product_name: "Suits",
    product_description: "Crafted to contour the body with precision",
    product_price: 2998,
    product_image: "https://media.istockphoto.com/id/157315425/photo/happy-teacher.jpg?b=1&s=612x612&w=0&k=20&c=EQCB8C5_A-yWlZ2cxHAXzQczlf-ULL4GQmwXv2-Mc6A=",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  },
  {
    product_name: "School uniform",
    product_description: "Crafted to contour the body with precision",
    product_price: 978,
    product_image: "https://images.pexels.com/photos/11941089/pexels-photo-11941089.jpeg?_gl=1*1mqxqh9*_ga*MjUzMjUzNTY0LjE3NjEyODk0MTk.*_ga_8JE65Q40S6*czE3NjQ1NTU1NzAkbzQkZzEkdDE3NjQ1NTg2MDIkajU5JGwwJGgw",
    product_category: "Kids",
    product_size:  "S,M,L,XL",
    product_stock: "In-Stock"
  }
];

module.exports = products;
