export const PRICING = {
  course: 18,
  exam: 6,
  certificate: 2,
} as const;

export type PaymentItemType = keyof typeof PRICING;

export const PAYMENT_PROVIDERS = [
  {
    id: "zaad" as const,
    name: "Zaad",
    label: "Zaad (Telesom)",
    instructions: [
      "U gudub *670# ama app-ka Zaad",
      "Dooro \"Maalgelisaha\"",
      "Geli lambarka account-ga: 4090909",
      "Geli qaddarka lacagta",
      "Geli PIN-kaaga",
      "Qor Transaction ID-ka ee ku soo baxay",
    ],
  },
  {
    id: "edahab" as const,
    name: "eDahab",
    label: "eDahab",
    instructions: [
      "U gudub app-ka eDahab ama *717#",
      "Dooro \"Dir\"",
      "Geli lambarka: 4090909",
      "Geli qaddarka lacagta",
      "Xaqiiji PIN-kaaga",
      "Qor Transaction ID-ka ee ku soo baxay",
    ],
  },
] as const;

export type PaymentProviderId = (typeof PAYMENT_PROVIDERS)[number]["id"];

export function providerLabel(id: string): string {
  return PAYMENT_PROVIDERS.find((p) => p.id === id)?.label ?? id;
}
