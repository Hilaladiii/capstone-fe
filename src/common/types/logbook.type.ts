export interface Logbook {
  logbookId: string;
  description: string;
  fileUrl: string;
  fileOriginalName: string;
  duration: number;
  date: string;
  note?: string;
}
