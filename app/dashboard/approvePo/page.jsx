import React from 'react'
import styles from '@/app/ui/dashboard/quotations/quotations.module.css';
import Search from '@/app/ui/dashboard/search/search';
import Link   from 'next/link';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import { fetchPurchaseOrders } from '@/app/lib/data';
import {deletePurchseOrder } from '@/app/lib/actions';


const ApprovePo = async({searchParams}) => { 
      const q = searchParams?.q || "";
      const page = searchParams?.page || 1; 
      const {count , purchaseOrders} = await fetchPurchaseOrders(q, page);
      return (
        <div className={styles.container}> 
          <div className={styles.top}>
            <Search placeholder="Search for a Project..." />
            {/*<Link href='/dashboard/approvePo/add'>
              <button className={styles.addButton}>Add New</button>        
      </Link>*/}
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <td>Supplier Name</td>
                  <td>Project Location Address</td>
                  <td>Purchase Order Number</td>
                  <td>Quotation Number</td>
                  <td>Created At</td>
                  <td>Approved By</td>
                  <td>Action</td>

                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((purchaseOrder) => ( 
                  
                <tr key={purchaseOrder.id}>
                  <td>
                    {purchaseOrder.supplier?.name || 'No Supplier name'} 
                  </td>
                  <td>{purchaseOrder.quotation?.projectName}</td>
                  <td>{purchaseOrder?.purchaseId}</td>
                  <td>{purchaseOrder.quotation?.quotationId}</td>
                  <td>{purchaseOrder.quotation?.createdAt?.toString().slice(4,16)}</td>
                  <td>
                  {purchaseOrder.user?.username
                  ? <span className={`${styles.statusBox} ${styles.approved}`}>Approved by {purchaseOrder.user.username}</span>
                  : <span className={`${styles.statusBox} ${styles.pending}`}>Pending</span>}
                </td>      
    
                  <td> 
                    <div className={styles.buttons}>
                    <Link href={`/dashboard/approvePo/${purchaseOrder.id}`}>
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
  

export default ApprovePo