import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const TransactionTable = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedTransaction(null);
    setOpenDialog(false);
  };

  return (
    <div className='transaction_table'>
      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Date & Time</TableCell>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} onClick={() => handleTransactionClick(transaction)}>
              <TableCell>{transaction.id}</TableCell>
            <TableCell>{transaction.amount}</TableCell>
            <TableCell>{transaction.dateTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Transaction Details</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <DialogContentText>
              ID: {selectedTransaction.id}
              <br />
              Payment Mode: {selectedTransaction.paymentMode}
              <br />
              Customer Mobile: {selectedTransaction.custMobile}
              <br />
              Card Label: {selectedTransaction.cardLabel}
              <br />
              Invoice No: {selectedTransaction.invoiceNo}
              <br />
              Amonunt: {selectedTransaction.amount}
              <br />
              Currency: {selectedTransaction.currency}
              <br />
              Pan: {selectedTransaction.pan}
              <br />
              Date Time: {selectedTransaction.dateTime}
              <br />
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Dashboard = () => {
  const transactions = [
    {
        id: 1,
        paymentMode: 'card',
        custMobile: null,
        cardLabel: 'visa',
        invoiceNo: 1,
        amount: 5000,
        currency: 'LKR',
        pan: '455555******7777',
        dateTime: '06-08-2023 10-08-22',
      },
      {
        id: 2,
        paymentMode: 'card',
        custMobile: null,
        cardLabel: 'visa',
        invoiceNo: 1,
        amount: 15000,
        currency: 'LKR',
        pan: '455555******7777',
        dateTime: '07-08-2023 12-18-22',
      },
  ];

  return (
    <div>
      <h1>Transaction List</h1>
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Dashboard;
