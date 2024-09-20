const AddNewSKUModal = ({ isOpen, onClose, onSubmit }) => {
    const [sku, setSKU] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = () => {
      onSubmit({ sku, productName, description });
      onClose();  
    };
  
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Add New SKU" className="modal-content" overlayClassName="modal-overlay">
        <h2>Add New SKU</h2>
        <form>
          <label>SKU<input type="text" value={sku} onChange={e => setSKU(e.target.value)} /></label>
          <label>Product Name<input type="text" value={productName} onChange={e => setProductName(e.target.value)} /></label>
          <label>Description<input type="text" value={description} onChange={e => setDescription(e.target.value)} /></label>
          <button type="button" onClick={handleSubmit}>Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </Modal>
    );
  };
  