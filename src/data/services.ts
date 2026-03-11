export interface Service {
  id: number;
  title: string;
  priceFrom: number;
  priceTo?: number;
  duration?: string;
  description: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Internship Report Writing",
    priceFrom: 80,
    duration: "1 - 3 days",
    description:
      "Well-structured internship reports tailored to academic requirements.",
  },
  {
    id: 2,
    title: "CV Writing",
    priceFrom: 30,
    duration: "1 - 3 days",
    description:
      "Professional CVs that highlight your skills and achievements.",
  },
  {
    id: 3,
    title: "Cover Letter Writing",
    priceFrom: 30,
    duration: "1 - 2 days",
    description:
      "Tailored cover letters that make your applications stand out.",
  },
  {
    id: 4,
    title: "Application Letter Writing",
    priceFrom: 25,
    duration: "1 - 2 days",
    description:
      "Clear, professional letters for job, school, or internship applications.",
  },
  {
    id: 5,
    title: "WordPress Hosting",
    priceFrom: 100,
    duration: "Monthly",
    description:
      "Affordable hosting packages with reliable uptime and support.",
  },
  {
    id: 6,
    title: "Thumbnails & Graphics",
    priceFrom: 100,
    duration: "3- 4 days",
    description:
      "Eye-catching thumbnails for YouTube, blogs, and social media.",
  },
  {
    id: 7,
    title: "AdSense Approval Support",
    priceFrom: 50,
    duration: "7 - 14 days",
    description:
      "Step-by-step guidance to help your site meet AdSense requirements.",
  },

  // NEW SERVICES

  {
    id: 8,
    title: "Selling Approved AdSense Blog (Blogger.com)",
    priceFrom: 500,
    priceTo: 1000,
    duration: "Ready within 14 - 20 days",
    description:
      "Ready-to-use Blogger sites with AdSense approval guaranteed.",
  },
  {
    id: 9,
    title: "Website Hosting (Free Domains: Vercel, Netlify, etc.)",
    priceFrom: 50,
    
    description:
      "Hosting on free platforms with professional setup and maintenance.",
  },
  {
    id: 10,
    title: "Website Hosting (Paid Domains: .com, .online, etc.)",
    priceFrom: 150,
    duration: "Per Year + Hosting Fees",
    description:
      "Full domain registration and hosting for a professional online presence.",
  },
  {
    id: 11,
    title: "Website Development for Small Businesses",
    priceFrom: 900,
    priceTo: 3000,
    duration: "3 - 5 months",
    description:
      "Custom websites for shops, startups, and service providers.",
  },
  {
    id: 12,
    title: "Assignment Completion",
    priceFrom: 100,
    priceTo: 300,
    duration: "2 - 5 days",
    description:
      "Academic assignments completed with precision and clarity.",
  },
  {
    id: 13,
    title: "Documentation & PowerPoint",
    priceFrom: 150,
    priceTo: 400,
    duration: "2 - 4 days",
    description:
      "Professional documentation and engaging PowerPoint presentations.",
  },
];

export default services;
