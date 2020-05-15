export default {
    formatCurrency: function (num) {
        console.log(num);
        return '$' + Number(num.toFixed(1)).toLocaleString() + ' ';
    }
}