export interface Category {
  name: string;
  topics: Topic[];
}

export interface Topic {
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  name: string;
  path: string;
}

const categories: Category[] = [
  {
    name: "Graphics & Design",
    topics: [
      {
        name: "Logo & Brand Identity",
        subCategories: [
          {
            name: "Logo Design",
            path: "/logo-design"
          },
          {
            name: "Brand Style Guides",
            path: "/brand-style-guides"
          },
          {
            name: "Business Cards & Stationery",
            path: "/business-cards-and-stationery"
          },
          {
            name: "Fonts & Typography",
            path: "/fonts-and-typography"
          },
          {
            name: "Logo Maker Tool",
            path: "/logo-maker-tool"
          }
        ]
      },
      {
        name: "Art & Illustration",
        subCategories: [
          {
            name: "Illustration",
            path: "/illustration"
          },
          {
            name: "AI Artists",
            path: "/ai-artists"
          },
          {
            name: "Children's Book Illustration",
            path: "/childrens-book-illustration"
          },
          {
            name: "Portraits & Caricatures",
            path: "/portraits-and-caricatures"
          },
          {
            name: "Cartoons & Comics",
            path: "/cartoons-and-comics"
          },
          {
            name: "Pattern Design",
            path: "/pattern-design"
          },
          {
            name: "Tattoo Design",
            path: "/tattoo-design"
          },
          {
            name: "Storyboards",
            path: "/storyboards"
          },
          {
            name: "NFT Art",
            path: "/nft-art"
          }
        ]
      }
    ]
  },
  {
    name: "Web & App Design",
    topics: [
      {
        name: "Website Design",
        subCategories: [
          { name: "Custom Website Design", path: "/custom-website-design" },
          {
            name: "WordPress Website Design",
            path: "/wordpress-website-design"
          },
          { name: "Wix Website Design", path: "/wix-website-design" },
          { name: "Shopify Website Design", path: "/shopify-website-design" },
          {
            name: "Squarespace Website Design",
            path: "/squarespace-website-design"
          }
        ]
      }
      //     {
      //       name: "App Design",
      //       subCategories: [
      //         "Mobile App Design",
      //         "Web App Design",
      //         "UI Design",
      //         "UX Design"
      //       ]
      //     },
      //     {
      //       name: "Landing Page Design",
      //       subCategories: [
      //         "Lead Generation Landing Pages",
      //         "Click-Through Landing Pages",
      //         "Squeeze Pages",
      //         "Sales Pages"
      //       ]
      //     },
      //     {
      //       name: "Icon Design",
      //       subCategories: [
      //         "Custom Icon Design",
      //         "App Icon Design",
      //         "Logo Icon Design",
      //         "Social Media Icon Design"
      //       ]
      //     }
    ]
  }
];

export default categories;
