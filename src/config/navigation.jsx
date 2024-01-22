import FaHouseUser from "../assets/img-sidebar/1.png";
import white from "../assets/img-sidebar/white.png";

export const navigationItems = {
  sidebar: [
    {
      name: "Dashboard",
      to: "/dashboard",
      text: "dashboard",
      icon: white,
      list: null,
    },
    {
      name: "Data",
      to: "/data",
      text: "tabsdemo",
      icon: FaHouseUser,
      iconWhite: white,
      list: [
        {
          icon: FaHouseUser,
          iconWhite: white,
          to: "/manageteam",
          name: "manage team",
        },
        {
          icon: FaHouseUser,
          name: "contacts information",
          iconWhite: white,
          to: "/contacts",

        },
        {
          icon: FaHouseUser,
          iconWhite: white,
          name: "invoices balance",
          to: "/invoices",
      
        },
      ],
    },

    {
      name: "Pages ",
      to: "/settings",
      text: "settings",
      list: [
        {
          icon: FaHouseUser,
          name: "Profile Form",
          iconWhite: white,
          to: "/ProfileForm",

        },
        {
          icon: FaHouseUser,
          iconWhite: white,
          to: "/Calendar",

          name: "Calendar",
        },
        {
          icon: FaHouseUser,
          iconWhite: white,
          to: "/FAQ",

          name: "FAQ Page",
        },
      ],
    },

    {
      name: "Charts ",
      to: "/Charts",
      text: "example",
      list: [
        {
          icon: FaHouseUser,
          iconWhite: white,
          to: "/Barechart",

          name: "Bare chart",
        },
        {
          icon: FaHouseUser,
          iconWhite: white,
          to: "/piechart",

          name: "Pie Chart",
        },
        {
          icon: FaHouseUser,
          iconWhite: white,
          to: "/linechart",


          name: "Line Chart",
        },
      ],
    },
  ],
  footer: [],
};
export default navigationItems;
