import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      initialValue: "Let's start something.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "string",
      initialValue: "Open to new projects · Chicago, IL",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Chicago, IL",
    }),
    defineField({
      name: "availability",
      title: "Availability Text",
      type: "string",
      initialValue: "Currently available for new projects",
    }),
    defineField({
      name: "formSectionLabel",
      title: "Form Section Label",
      type: "string",
      initialValue: "Send a message",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
