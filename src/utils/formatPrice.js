export const commaDelimitNumber = (num) => {
    return num.toLocaleString();
}

export const formatDispatchPrice = (price) => {
    return price.split(",").join("");
}