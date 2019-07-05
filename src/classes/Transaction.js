export const aggregateData = (transactions) => {
    let map = new Map();
    transactions.forEach((t) => {
       let list = map.get(t.txnNum);
       if (!list) {
           map.set(t.txnNum, [t]);
       } else {
           list.push(t);
       }
    });

    let nestedTransactions = [];
    map.forEach((list) => {
        nestedTransactions.push(newTransaction(list));
    });
    return nestedTransactions;
};

const newTransaction = (lines) => {
    let quantity = 0;
    let value = 0;
    let items = [];

    lines.forEach((line) => {
       quantity = quantity + line.quantity;
       value = value + line.value;
       items.push(newLine(line.itemId, line.brand, line.category, line.quantity, line.value));
    });

    return {
        txnDate: lines[0].txnDate.slice(0,8),
        txnNum: lines[0].txnNum,
        quantity: quantity,
        value: SgdFormatter(value),
        member_id: lines[0].member_id,
        lines: items
    }
};

const newLine = (itemId, brand, category, quantity, value) => {
    return {
        itemId: itemId,
        brand: brand,
        category: category,
        unit_value: SgdFormatter(value/quantity),
        quantity: quantity,
        value: SgdFormatter(value)
    }
};

const SgdFormatter = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'SGD' })
    .format(num).slice(4);