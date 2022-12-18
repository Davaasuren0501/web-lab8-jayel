const Spinner = () => {
  return (
    <div class="flex justify-center items-center mt-36">
      <div
        class="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
