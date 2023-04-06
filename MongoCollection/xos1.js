const refXml = document.querySelector("sql");

const tables = document.querySelectorAll("table");
const a = [
  "company",
  "employee",
  "product",
  "category",
  "client",
  "order",
  "price",
  "status",
  "delivery",
  "polygon",
  "polList",
  "delList",
  "arrival",
  "traffic",
  "address",
  "token",
  "remainder",
  "provider",
  "unit",
  "discount",
  "bonus",
  "region",
  "city",
  "dlvTime",
  "num",
  "consumption",
  "place",
  "ordList",
  "courier",
  "rack",
  "cell",
  "role",
  "terms",
  "reward",
  "rewList",
  "arrList",
  "commodity",
  "group",
  "party",
  "box",
  "package",
  "pacStatus",
  "delStatus",
  "doc",
  "payConfig",
  "paySystem",
  "balance",
  "pickup",
  "googlePlay",
  "screen",
  "paw",
  "agent",
  "work",
  "partner",
  "parList",
  "message",
  "entity",
  "town",
  "promo",
  "check",
  "used",
  "img",
  "tariff",
  "tarList",
  "pacList",
  "tarDelivery",
  "tip",
  "tarTip",
  "balEmployee",
  "reduction",
  "payment",
  "card",
  "chosen",
  "bid",
  "bidList",
  "bidOrder",
  "kladr",
  "post",
  "push",
  "property",
  "item",
  "detail",
  "combination",
  "comList",
  "fabric",
  "promotion",
  "proList",
  "proCategory",
  "proProduct",
  "review",
  "cliInfo",
  "favorite",
  "icDict",
  "icSale",
  "calendar",
  "additive",
  "proAdditive",
  "task",
  "celList",
  "comInvoice",
];
const coll = [];

console.log("refXml = ", refXml);

for (let i = 0; i < tables.length; i++) {
  const table = tables[i].attributes.name.nodeValue;
  coll.push(table);
}
console.log("Исходный", coll, a);

const difC = coll.filter((val, idx) => !a.includes(val));
const difA = a.filter((val, idx) => !coll.includes(val));
console.log("отличия", difC, difA);

const difCr = coll.filter((val, idx) => a.includes(val));
const difAr = a.filter((val, idx) => coll.includes(val));
console.log("сходства", difCr, difAr);

// удалить и найти дупликаты

const cl = [];
for (let i = 0; i < a.length; i++) {
  if (!cl.includes(a[i])) {
    cl.push(a[i]);
  } else {
    console.log("duplex", a[i]);
  }
}
