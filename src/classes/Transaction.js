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
       quantity = quantity + parseInt(line.quantity);
       value = value + parseFloat(line.salesValue);
       items.push(newLine(line.itemId, line.itemDesc, line.categoryType, line.quantity, line.salesValue));
    });

    return {
        txnDate: lines[0].txnDate.slice(8,10) + ":" + lines[0].txnDate.slice(10,12) + ":" + lines[0].txnDate.slice(12,14),
        txnNum: lines[0].txnNum,
        quantity: parseInt(quantity,10),
        value: SgdFormatter(value),
        member_id: lines[0].member_id,
        lines: items
    }
};

const newLine = (itemId, itemName, category, quantity, value) => {
    return {
        itemId: itemId,
        itemName: itemName,
        category: category,
        unit_value: SgdFormatter(parseFloat(value)/parseInt(quantity, 10)),
        quantity: parseInt(quantity,10),
        value: SgdFormatter(value)
    }
};

const SgdFormatter = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'SGD' })
    .format(num).slice(4);