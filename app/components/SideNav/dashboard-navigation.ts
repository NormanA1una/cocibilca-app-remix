type NavigationType = {
  path: string;
  icon: string;
  name: string;
};

export const Navigation: NavigationType[] = [
  { path: "suppliers", icon: "🚛", name: "Suppliers" },
  { path: "products", icon: "🛒", name: "Products" },
  { path: "users", icon: "👥", name: "Users" },
];
