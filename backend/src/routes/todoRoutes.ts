import { Router } from 'express';
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todoController';
import { validateTodo, validateUpdateTodo } from '../middlewares/validator';
import { authMiddleware } from '../middlewares/authMiddleware'; // Menggunakan kurung kurawal kembali

const router = Router();

// GET /api/todos — Ambil semua todo milik user
router.get('/', authMiddleware, getTodos);

// GET /api/todos/:id — Ambil satu todo berdasarkan ID
router.get('/:id', authMiddleware, getTodoById);

// POST /api/todos — Tambah todo baru
router.post('/', authMiddleware, validateTodo, createTodo);

// PUT /api/todos/:id — Update todo (task atau status selesai)
router.put('/:id', authMiddleware, validateUpdateTodo, updateTodo);

// DELETE /api/todos/:id — Hapus todo
router.delete('/:id', authMiddleware, deleteTodo);

export default router;