
const date = new Date(); // or any date you want
export const monthYear = date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
});