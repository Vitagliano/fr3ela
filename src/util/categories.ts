export interface Category {
  name: string;
  topics: Topic[];
}

export interface Topic {
  name: string;
  subCategories: string[];
}

const categories: Category[] = [
  {
    name: "Graphics & Design",
    topics: [
      {
        name: "Logo & Brand Identity",
        subCategories: [
          "Logo Design",
          "Brand Style Guides",
          "Business Cards & Stationery",
          "Fonts & Typography",
          "Logo Maker Tool"
        ]
      },
      {
        name: "Art & Illustration",
        subCategories: [
          "Illustration",
          "AI Artists",
          "Children's Book Illustration",
          "Portraits & Caricatures",
          "Cartoons & Comics",
          "Pattern Design",
          "Tattoo Design",
          "Storyboards",
          "NFT Art"
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
          "Custom Website Design",
          "WordPress Website Design",
          "Wix Website Design",
          "Shopify Website Design",
          "Squarespace Website Design"
        ]
      },
      {
        name: "App Design",
        subCategories: [
          "Mobile App Design",
          "Web App Design",
          "UI Design",
          "UX Design"
        ]
      },
      {
        name: "Landing Page Design",
        subCategories: [
          "Lead Generation Landing Pages",
          "Click-Through Landing Pages",
          "Squeeze Pages",
          "Sales Pages"
        ]
      },
      {
        name: "Icon Design",
        subCategories: [
          "Custom Icon Design",
          "App Icon Design",
          "Logo Icon Design",
          "Social Media Icon Design"
        ]
      }
    ]
  }
];

export default categories;
