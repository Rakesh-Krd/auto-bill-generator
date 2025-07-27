const Header = ({ company, onLoginClick, onLogout, onViewHistory }) => {
  return (
    <header className="bg-blue-50 shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
      <h1 className="text-2xl font-bold text-blue-600">Auto Bill Generator</h1>
      <div className="flex flex-wrap items-center gap-3">
        {company ? (
          <>
            <span className="text-sm text-gray-600">
              <strong>Welcome, {company.companyName}</strong>
            </span>
            <button className="btn-blue text-sm px-3 py-1" onClick={onViewHistory}>
              View History
            </button>
            <button className="btn-blue text-sm px-3 py-1" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn-blue text-sm px-4 py-2" onClick={onLoginClick}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
