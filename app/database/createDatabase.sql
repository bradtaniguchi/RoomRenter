CREATE TABLE USERS(
    Student_Email TEXT PRIMARY KEY,
    Student_ID
);
CREATE TABLE RESERVATIONS(
    Entry INTEGER PRIMARY KEY, /*Manually increment this outside of sql*/
    Student_Email TEXT NOT NULL,
    Room_Number INTEGER NOT NULL,
    Time_In DATE NOT NULL,
    Time_Out DATE NULL, /*This can be null*/
    FOREIGN KEY(Student_Email) REFERENCES USERS(Student_Email)
);

