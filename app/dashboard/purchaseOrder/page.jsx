import React from 'react';
import styles from '@/app/ui/dashboard/purchaseOrders/purchaseOrders.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Link from 'next/link';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { fetchPurchaseOrders } from '@/app/lib/data';
import { deletePurchseOrder } from '@/app/lib/actions';
 
const PurchaseOrderPage = async ({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const {count , purchaseOrders} = await fetchPurchaseOrders(q, page);
  
  return ( 
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a Supplier..." />
        <Link href='/dashboard/purchaseOrder/add'>
          <button className={styles.addButton}>Add New</button>        
        </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Supplier Name</td>
              <td>Purchase Order Number</td>
              <td>Quotation Number</td>
              <td>Quotation Date</td>
              <td>Created At</td> 
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            
            {purchaseOrders.map((purchaseOrder) => (
              
              <tr key={purchaseOrder.id}>
              <td>{purchaseOrder.supplier?.name || 'No supplier name'}</td>
              <td>{purchaseOrder.purchaseId || 'No Quotation Number'}</td>
              <td>{purchaseOrder.quotation?.quotationId || 'No Quotation Number'}</td>
              <td>{purchaseOrder.quotation?.createdAt ? new Date(purchaseOrder.quotation.createdAt).toDateString().slice(4, 16) : 'No Quotation Date'}</td>
              <td>{purchaseOrder.createdAt?.toString().slice(4,16)}</td>
              <td> 
                <div className={styles.buttons}>
                <Link href={`/dashboard/purchaseOrder/${purchaseOrder.id}`}>
                  <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <form action={deletePurchseOrder}>
                  <input type='hidden' name='id' value={purchaseOrder.id}/>
                  <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  
                  </form>
                  </div>
                  
              </td>
              
            </tr>
            
           ))}
          </tbody>
        </table>
      <Pagination count={count}/>
    </div>
    
  )

}


export default PurchaseOrderPage