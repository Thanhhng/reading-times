export type Sentence = { id: string; src: string; tgt: string };

const prideAndPrejudice: Sentence[] = [
  {
    id: "s_0001",
    src: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    tgt: "Có một sự thật ai cũng công nhận, rằng một người đàn ông độc thân sở hữu một gia tài kha khá hẳn phải đang cần một người vợ.",
  },
  {
    id: "s_0002",
    src: "However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.",
    tgt: "Dù người ta ít biết về tình cảm hay quan điểm của một người đàn ông như thế khi anh ta mới đến một vùng, sự thật ấy đã in sâu trong tâm trí các gia đình lân cận đến mức anh ta được xem là tài sản chính đáng của một trong những cô con gái của họ.",
  },
  {
    id: "s_0003",
    src: "“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?”",
    tgt: "“Ông Bennet thân mến,” một hôm bà vợ nói với ông, “ông đã nghe tin Netherfield Park cuối cùng cũng có người thuê chưa?”",
  },
  {
    id: "s_0004",
    src: "Mr. Bennet replied that he had not.",
    tgt: "Ông Bennet đáp rằng ông chưa nghe.",
  },
  {
    id: "s_0005",
    src: "“But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.”",
    tgt: "“Nhưng đúng là vậy đấy,” bà đáp; “vì bà Long vừa ghé qua đây, và bà ấy đã kể cho tôi nghe tất cả.”",
  },
  {
    id: "s_0006",
    src: "Mr. Bennet made no answer.",
    tgt: "Ông Bennet không trả lời.",
  },
  {
    id: "s_0007",
    src: "“Do you not want to know who has taken it?” cried his wife impatiently.",
    tgt: "“Ông không muốn biết ai đã thuê nó sao?” bà vợ sốt ruột kêu lên.",
  },
  {
    id: "s_0008",
    src: "“You want to tell me, and I have no objection to hearing it.”",
    tgt: "“Bà muốn kể cho tôi nghe, và tôi cũng chẳng phản đối việc nghe đâu.”",
  },
  {
    id: "s_0009",
    src: "This was invitation enough.",
    tgt: "Lời ấy đã là một lời mời đủ rồi.",
  },
  {
    id: "s_0010",
    src: "“Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England.”",
    tgt: "“Này, ông thân mến, ông phải biết rằng bà Long nói Netherfield đã được một chàng trai trẻ giàu có từ miền bắc nước Anh thuê.”",
  },
  {
    id: "s_0011",
    src: "“What is his name?”",
    tgt: "“Anh ta tên gì?”",
  },
  {
    id: "s_0012",
    src: "“Bingley.”",
    tgt: "“Bingley.”",
  },
  {
    id: "s_0013",
    src: "“Is he married or single?”",
    tgt: "“Anh ta đã lập gia đình hay còn độc thân?”",
  },
  {
    id: "s_0014",
    src: "“Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!”",
    tgt: "“Ồ! còn độc thân, ông thân mến, chắc chắn rồi! Một người đàn ông độc thân giàu có; bốn hay năm ngàn một năm. Thật là điều tuyệt vời cho các con gái của chúng ta!”",
  },
];

const sample: Sentence[] = [
  {
    id: "d_0001",
    src: "This book doesn’t have a bilingual excerpt loaded yet.",
    tgt: "Cuốn sách này chưa có đoạn song ngữ được nạp sẵn.",
  },
  {
    id: "d_0002",
    src: "Open it anyway — the reader behaves the same for every book.",
    tgt: "Cứ mở ra đi — trình đọc hoạt động giống nhau cho mọi cuốn sách.",
  },
  {
    id: "d_0003",
    src: "Tap a sentence to reveal its translation, or switch to parallel mode in the Aa panel.",
    tgt: "Chạm vào một câu để hiện bản dịch, hoặc chuyển sang chế độ song song trong bảng Aa.",
  },
];

const byBook: Record<string, Sentence[]> = {
  "gutenberg-1342": prideAndPrejudice,
};

export function getSentences(bookId: string): Sentence[] {
  return byBook[bookId] ?? sample;
}
