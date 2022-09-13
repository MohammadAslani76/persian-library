import {FaTrash} from "react-icons/fa";
import {useState,useEffect} from "react";

const getBook = () => {
    const data = localStorage.getItem("books");
    if (data){
        return JSON.parse(data)
    }else return []
}

function App() {
    const [title,setTitle] = useState("");
    const [author,setAuthor] = useState("");
    const [number,setNumber] = useState(0);
    const [books,setBooks] = useState(getBook());

    useEffect(() => {
        localStorage.setItem("books",JSON.stringify(books));
    },[books])

    const handleSubmit = (e) => {
        e.preventDefault();
        let book = {
            title,author,number
        }
        setBooks([...books,book])
    }

    const deletebook = (number) => {
        const filteredBook = books.filter(book => {
            return  book.number !== number
        })
        setBooks(filteredBook);
    }

  return (
    <div className="p-4 container">
        <h1 className="text-center font-bold text-2xl border-b-2 border-amber-300 py-3 mb-8">کتابخانه ی علامه دهخدا</h1>
        <div className="flex flex-col md:flex-row gap-5">
          <form onSubmit={handleSubmit} className="flex flex-col p-3 items-center gap-2 justify-between bg-gray-400 rounded flex-1 w-full max-w-md max-h-44 mx-auto">
            <div className="flex gap-2 items-center justify-between w-full">
              <label htmlFor="title" className="font-bold">عنوان</label>
              <input type="text" onChange={e => setTitle(e.target.value)} className="border-0 outline-0 rounded px-2 py-1 w-2/3" required/>
            </div>
            <div className="flex gap-2 items-center justify-between w-full">
              <label htmlFor="title" className="font-bold">نویسنده</label>
              <input type="text" onChange={e => setAuthor(e.target.value)} className="border-0 outline-0 rounded px-2 py-1 w-2/3" required/>
            </div>
            <div className="flex gap-2 items-center justify-between w-full">
              <label htmlFor="title" className="font-bold">شماره</label>
              <input type="number" onChange={e => setNumber(e.target.value)} className="border-0 outline-0 rounded px-2 py-1 w-2/3" required/>
            </div>
            <button type="submit" className="py-1 w-full rounded bg-sky-400 transition-all hover:bg-sky-600">ثبت</button>
          </form>
            {books.length < 1 && <div className="rounded flex-1 mx-auto w-full p-2 bg-gray-300 max-w-md">
                <h2 className="text-center font-bold text-red-800">هیچ کتابی در کتابخانه وجود ندارد.</h2>
            </div>}
            {books.length > 0 &&
                <div className="rounded flex-1 mx-auto w-full p-2 bg-gray-300 max-w-md">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b-2 border-amber-600">
                            <th className="py-2">شماره</th>
                            <th className="py-2">نام کتاب</th>
                            <th className="py-2">نویسنده</th>
                            <th className="py-2">حذف</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map((book) => (
                            <tr key={book.number} className="text-center border-b border-b-pink-400">
                                <td className="py-2">{book.number}</td>
                                <td className="py-2">{book.title}</td>
                                <td className="py-2">{book.author}</td>
                                <td className="cursor-pointer flex justify-center items-center py-2 text-red-500" onClick={() => deletebook(book.number)}><FaTrash/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="w-full text-center">
                        <button onClick={() => setBooks([])} className="w-full mt-3 py-1 bg-red-400 rounded">حذف همه</button>
                    </div>
                </div>
            }
        </div>
    </div>
  );
}

export default App;
