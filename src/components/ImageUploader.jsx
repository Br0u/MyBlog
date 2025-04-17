import { useState } from 'react';

function ImageUploader({ onImageUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }
    
    // Preview the image
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target.result);
    reader.readAsDataURL(file);
    
    // Simulate uploading
    setUploading(true);
    setError('');
    
    try {
      // For now, we're just simulating the upload
      // This will be replaced with actual upload to Firebase/Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a fake URL for demo purposes
      const fakeImageUrl = `https://example.com/images/${Date.now()}-${file.name}`;
      
      // Call the callback with the image URL
      onImageUploaded(fakeImageUrl);
      
      // Reset the form
      e.target.value = null;
    } catch (err) {
      setError(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-4">
        <label className="block">
          <span className="sr-only">Choose image</span>
          <input 
            type="file" 
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            onChange={handleFileChange}
            accept="image/*"
            disabled={uploading}
          />
        </label>
        {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {previewUrl && !uploading && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Preview:</p>
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-w-xs h-auto rounded-md shadow-sm" 
          />
        </div>
      )}
      
      <p className="mt-2 text-xs text-gray-500">
        * Image upload is simulated for now. Will be connected to cloud storage in the future.
      </p>
    </div>
  );
}

export default ImageUploader; 