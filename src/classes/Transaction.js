export const filterData = (nestedTransactions, key) => {
    let filteredTransactions = [];
    nestedTransactions.forEach((t) => {
       if (isMatchedTransaction(t, key))
           filteredTransactions.push(t);
    });
    return filteredTransactions;
};

const isMatchedTransaction = (transaction, key) => {
    return transaction.lines.find((line) => {
        return line.itemId.includes(key);
    })
};

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
        line.salesValue = line.salesValue === "null" ? 0 : parseFloat(line.salesValue);
        line.quantity = parseInt(line.quantity);

       quantity = quantity + line.quantity;
       value = value + line.salesValue;
       items.push(newLine(line.itemId, line.itemDesc, line.categoryType, line.quantity, line.salesValue));
    });

    return {
        txnDate: lines[0].txnDate.slice(8,10) + ":" + lines[0].txnDate.slice(10,12) + ":" + lines[0].txnDate.slice(12,14),
        txnNum: lines[0].txnNum,
        quantity: quantity,
        value: sgdFormatter(value),
        member_id: lines[0].member_id,
        lines: items
    }
};

const newLine = (itemId, itemName, category, quantity, value) => {
    return {
        itemId: itemId,
        itemName: itemName,
        category: category,
        unit_value: sgdFormatter(value/quantity),
        quantity: quantity,
        value: sgdFormatter(value)
    }
};

export const sgdFormatter = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'SGD' })
    .format(num).slice(4);