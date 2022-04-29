

export const formatNumber = (number: number): string => number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})