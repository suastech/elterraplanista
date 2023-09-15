const wordFinder = (general_list, search) => {
  const matching_elements = general_list.filter(phrase => {
      const { text, author, info_author, comment } = phrase

      return (
        text.toLowerCase().includes(search.toLowerCase()) || 
        author.toLowerCase().includes(search.toLowerCase()) ||
        (info_author && info_author.toLowerCase().includes(search.toLowerCase())) ||
        (comment && comment.toLowerCase().includes(search.toLowerCase()))
      );
    });
    
  return matching_elements;
};

export default wordFinder;
