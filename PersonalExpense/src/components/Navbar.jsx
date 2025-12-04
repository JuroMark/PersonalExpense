import { Link } from 'react-router-dom';
import { BiWallet, BiHome, BiPlusCircle, BiBarChart } from 'react-icons/bi';

function Navbar() {
  return (
    <nav className='navbar navbar-dark bg-primary mb-4'>
      <div className='container'>
        <Link to='/' className='navbar-brand mb-0 h1 text-white text-decoration-none'>
          <BiWallet className='me-2' />
          Quản Lý Chi Tiêu
        </Link>
        <div className='d-flex gap-2'>
          <Link to='/' className='btn btn-outline-light'>
            <BiHome className='me-1' />
            Trang chủ
          </Link>
          <Link to='/charts' className='btn btn-outline-light'>
            <BiBarChart className='me-1' />
            Biểu đồ
          </Link>
          <Link to='/add' className='btn btn-light'>
            <BiPlusCircle className='me-1' />
            Thêm mới
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
