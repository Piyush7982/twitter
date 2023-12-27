function generateHashtag(content) {
  let Hashtagarray = content.split(" ").filter((word) => {
    return word.match(/\B(\#[a-zA-Z]+\b)(?!;)/);
  });

  // const hashtag = Hashtagarray.map((word) => {
  //   return word.replace("#", "");
  // });

  const hashtag = Hashtagarray.map((tag) => tag.substring(1).toLowerCase());

  return hashtag;
}

module.exports = generateHashtag;
