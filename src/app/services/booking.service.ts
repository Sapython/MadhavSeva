import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { paymentDetail } from '../structures/payment.structure';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  updateBooking(id: string | undefined, arg1: { approved: boolean; }) {
    return updateDoc(doc(this.fs,`bookings/${id}`),arg1)
  }

  constructor(private fs:Firestore) { }


  addBooking(data:paymentDetail){
    return addDoc(collection(this.fs,'bookings'),data)
  }

  addBookingOffline(data:paymentDetail){
    return addDoc(collection(this.fs,'bookings'),{...data,offline:true})
  }

  addGitaBooking(data:paymentDetail){
    return addDoc(collection(this.fs,'gitaBookings'),{...data,seva:'Gitamritam'})
  }

  addGitaBookingOffline(data:paymentDetail){
    return addDoc(collection(this.fs,'gitaBookings'),{...data,seva:'Gitamritam',offline:true})
  }

  getGitaBooking(id:string){
    return getDoc(doc(this.fs,`gitaBookings/${id}`))
  }

  getGitaBookings(){
    return getDocs(collection(this.fs,'gitaBookings'))
  }

  updateGitaBooking(id: string | undefined, arg1: { approved: boolean; }){
    return updateDoc(doc(this.fs,`gitaBookings/${id}`),arg1)
  }

  getBooking(id:string){
    return getDoc(doc(this.fs,`bookings/${id}`))
  }

  getOfflineBookings(){
    return getDocs(query(collection(this.fs,'bookings'),where('mode','==','offline')))
  }
  
  getOnlineBookings(){
    return getDocs(query(collection(this.fs,'bookings'),where('mode','==','online')))
  }

}