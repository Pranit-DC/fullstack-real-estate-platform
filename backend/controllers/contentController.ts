import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import Content from '../models/Content';

export const getAllContent = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const docs = await Content.find({}, 'section data -_id');
    const result: Record<string, unknown> = {};
    docs.forEach((doc) => {
      result[doc.section] = doc.data;
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getSectionContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const doc = await Content.findOne(
      { section: req.params.section },
      'section data -_id'
    );
    if (!doc) {
      res.status(404).json({ message: 'Section not found.' });
      return;
    }
    res.status(200).json(doc.data);
  } catch (err) {
    next(err);
  }
};

export const updateSectionContent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  try {
    const { section } = req.params;
    const incoming = req.body as Record<string, unknown>;

    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
      res.status(400).json({ message: 'Request body must be a JSON object.' });
      return;
    }

    const existing = await Content.findOne({ section });
    if (!existing) {
      res.status(404).json({ message: 'Section not found.' });
      return;
    }

    // Shallow merge — preserves fields not included in the PATCH payload
    existing.data = { ...(existing.data as Record<string, unknown>), ...incoming };
    existing.markModified('data'); // Required: Mongoose won't detect changes in Mixed type
    await existing.save();

    res.status(200).json({ message: 'Updated successfully.', data: existing.data });
  } catch (err) {
    next(err);
  }
};
