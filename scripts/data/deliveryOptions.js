import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

function isWeekend(deliveryDate) {
  const dayOfWeek = deliveryDate.format("dddd");

  return dayOfWeek === "Satruday" || dayOfWeek === "Sunday";
}

export function calculateDeliveryDate(deliveryOption) {
  // const today = dayjs();
  //   const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  //   const dateString = deliveryDate.format("dddd, MMMM D");
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "days");

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  return deliveryDate.format("dddd, MMMM D");
}

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];
