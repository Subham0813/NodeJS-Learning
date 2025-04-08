/* eslint-disable react/prop-types */

const Feed = ({ title, link, pubDate}) => {

    const options = { year: 'numeric', month: 'short', day: '2-digit'}
    const date = new Date(pubDate).toLocaleDateString('en-US', options)
  return (
    <div className="px-2 mb-4 ">
      <a href={link} target='_blank' rel="noopener noreferrer">
        <h2 className="font-medium mb-1 hover:text-orange-500">{title}</h2>
        <p className="text-xs font-medium">{date}</p>
      </a>
    </div>
  );
};

export default Feed;
