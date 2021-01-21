export class Bookinstance {
  id: string;
  book: {
    id: string;
  }
  imprint: string;
  status: string;
  due_back: Date;
}
