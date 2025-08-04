const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let boards = [
    {
        id: 1,
        displayId: 1,
        title: "title3",
        content: "content3",
        createdAt: "2025-08-01"
    },
    {
        id: 2,
        displayId: 2,
        title: "title323",
        content: "content3",
        createdAt: "2025-08-01"
    },
    {
        id: 3,
        displayId: 3,
        title: "title333",
        content: "content3",
        createdAt: "2025-08-01"
    }
];
let initId = 4;

// 게시글 생성
app.post("/boards", (req, res) => {
    try {
        const newBoard = {
            id: initId++,
            displayId: boards.length + 1,
            title: req.body.title,
            content: req.body.content,
            createdAt: new Date().toISOString()
        };
        boards.push(newBoard);
        res.status(201).json({ message: "게시글 생성 완료", boards });
    } catch (error) {
        console.error("게시글 생성 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 전체 게시글 조회
app.get("/boards", (req, res) => {
    res.status(200).json({ message: "전체 게시글 조회", boards });
});

app.get("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id);
        const board = boards.find(b => b.id === boardId);

        if (!board) {
            return res.status(404).json({ message: "해당 게시글이 없습니다" });
        }

        res.status(200).json({ message: "게시글 조회 성공", board });
    } catch (error) {
        console.error("게시글 조회 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

app.delete("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id);
        const index = boards.findIndex(b => b.id === boardId);

        if (index === -1) {
            return res.status(404).json({ message: "삭제할 게시글이 없습니다" });
        }

        const deleted = boards.splice(index, 1); // 삭제
        res.status(200).json({ message: "게시글 삭제 완료", deleted: deleted[0] });
    } catch (error) {
        console.error("게시글 삭제 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

app.put("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id);
        const board = boards.find(b => b.id === boardId);

        if (!board) {
            return res.status(404).json({ message: "수정할 게시글이 없습니다" });
        }

    
        board.title = req.body.title || board.title;
        board.content = req.body.content || board.content;

        res.status(200).json({ message: "게시글 수정 완료", board });
    } catch (error) {
        console.error("게시글 수정 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

app.patch("/boards/:id", (req, res) => {
    try {
        const boardId = Number(req.params.id);
        const index = boards.findIndex(b => b.id === boardId);

        if (index === -1) {
            return res.status(404).json({ message: "게시글 일부 수정 중 아이디가 없음" });
        }

        const { title } = req.body;

        if (typeof title !== 'string' || title.trim() === "") {
            return res.status(400).json({ message: "타이틀은 비어있지 않은 문자열 이어야 합니다" });
        }

        boards[index] = {
            ...boards[index],
            title: title.trim()
        };

        res.status(200).json({
            message: "게시글 제목 수정하기 완료",
            board: boards[index]
        });

    } catch (error) {
        console.error("게시글 수정 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

app.patch("/boards/:id/content", (req, res) => {
    try {
        const boardId = Number(req.params.id);
        const index = boards.findIndex(b => b.id === boardId);

        if (index === -1) {
            return res.status(404).json({ message: "게시글 수정 중 ID를 찾을 수 없습니다." });
        }

        const { content } = req.body;

        if (typeof content !== 'string' || content.trim() === "") {
            return res.status(400).json({ message: "컨텐츠는 비어있지 않은 문자열이어야 합니다." });
        }

        boards[index] = {
            ...boards[index],
            content: content.trim()
        };

        res.status(200).json({
            message: "게시글 컨텐츠 수정 완료",
            board: boards[index]
        });

    } catch (error) {
        console.error("게시글 컨텐츠 수정 중 오류", error);
        res.status(500).json({ message: "서버 오류" });
    }
});

// 홈
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});