import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  imports: [FormsModule, CommonModule, NavbarComponent, FooterComponent]
})

export class LandingPageComponent implements OnInit {
  db: any;
  cardData: any[] = [];
  contentData: any[] = [];
  skillsCardData: any[] = [];

  firebaseConfig = {
    apiKey: "AIzaSyAmV62AtZS-n-aM1cZSC5Sr567vBqRlPNU",
    authDomain: "cards-df1a0.firebaseapp.com",
    projectId: "cards-df1a0",
    storageBucket: "cards-df1a0.appspot.com",
    messagingSenderId: "373558867431",
    appId: "1:373558867431:web:7ff082d6c743c6ae57f942",
    measurementId: "G-ZWT0NS9DK2"
  };

  constructor() { }

  ngOnInit(): void {
    this.initializeFirebase();
    // this.createContentTableRecord();
    // this.fetchContentTable();
    this.fetchCards();
    this.fetchSkillsCards();
  }

  initializeFirebase() {
    const app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(app);
  }

  // async createContentTableRecord() {
  //   const contentId = "123";
  //   const contentRef = doc(this.db, "ContentTable", contentId);
  //   const contentSnap = await getDoc(contentRef);

  //   if (contentSnap.exists()) {
  //     console.log("Record already exists:", contentId);
  //   } else {
  //     try {
  //       const docRef = await addDoc(collection(this.db, "ContentTable"), {
  //         contentId: contentId,
  //         contentName: "Example Content",
  //         entryDate: new Date().toISOString(),
  //         activeDate: "2024-10-19",
  //         expiryDate: "2024-12-31",
  //         status: "Active",
  //         isClickable: true,
  //         priority: 1,
  //         positioning: "Top"
  //       });
  //       console.log("Record written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding record: ", e);
  //     }
  //   }
  // }

  // async fetchContentTable() {
  //   try {
  //     const querySnapshot = await getDocs(collection(this.db, "ContentTable"));
  //     this.contentData = querySnapshot.docs.map(doc => doc.data());
  //   } catch (error) {
  //     console.error("Error fetching content table:", error);
  //   }
  // }



  async fetchSkillsCards() {
    try {
      const querySnapshot = await getDocs(collection(this.db, "SkillsCard"));
      this.skillsCardData = querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error fetching SkillsCard:", error);
    }
  }
  
  async fetchCards() {
    try {
      const querySnapshot = await getDocs(collection(this.db, "card"));
      this.cardData = querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }
}


