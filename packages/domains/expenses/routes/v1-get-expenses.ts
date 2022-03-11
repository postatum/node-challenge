import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { publicFields } from '../formatter';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { query, validationResult } from 'express-validator';

export const router = Router();

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_SORT_FIELD = 'date_created';
const DEFAULT_SORT_ORDER = 'desc';

router.get(
  // Endpoint URL
  '/get-user-expenses',

  query('userId').trim(),
  // Pagination
  query('page')
    .default(1)
    .isInt({ min: 1 })
    .toInt(),
  query('perPage')
    .default(DEFAULT_PAGE_SIZE)
    .isInt({ min: 1 })
    .toInt(),

  // Sorting
  query('sort')
    .default(DEFAULT_SORT_FIELD)
    .isIn(publicFields)
    .trim(),
  query('sortOrder')
    .default(DEFAULT_SORT_ORDER)
    .isIn(['asc', 'desc'])
    .trim(),

  // Filtering
  query('merchant_name').optional({ checkFalsy: true }).trim(),
  query('currency').optional({ checkFalsy: true }).trim(),
  query('status').optional({ checkFalsy: true }).trim(),

  // Handler
  async (req, res, next) => {
    // express-validator error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [expensesError, userExpenses] = await to(getUserExpenses(req.query));

    if (expensesError) {
      return next(new ApiError(
        expensesError,
        expensesError.status,
        `Could not get user expenses: ${expensesError}`,
        expensesError.title, req
      ));
    }

    return res.json({
      page: req.query.page,
      perPage: req.query.perPage,
      resultsNum: userExpenses ? userExpenses.length : 0,
      results: userExpenses || [],
    });
  }
);
