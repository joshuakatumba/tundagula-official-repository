import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const listingId = Number.parseInt(id, 10);

    if (Number.isNaN(listingId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid listing id.' },
        { status: 400 }
      );
    }

    const db = await getDb();
    const item = await db.get('SELECT title FROM listings WHERE id = ?', listingId);

    if (!item) {
      return NextResponse.json(
        { success: false, error: `Listing with ID ${listingId} not found.` },
        { status: 404 }
      );
    }

    const result = await db.run('DELETE FROM listings WHERE id = ?', listingId);
    if (!result || result.changes === 0) {
      return NextResponse.json(
        { success: false, error: 'Delete failed. No rows changed.' },
        { status: 500 }
      );
    }

    await db.run(
      'INSERT INTO notifications (title, message, type) VALUES (?, ?, ?)',
      'Listing Deleted',
      `"${item.title}" has been removed from your portal.`,
      'warning'
    );

    return NextResponse.json({
      success: true,
      deletedId: listingId,
      message: `Listing "${item.title}" deleted successfully.`
    });
  } catch (error) {
    console.error('[DELETE /api/listings/:id] error', error);
    return NextResponse.json(
      { success: false, error: 'Unexpected server error during deletion.' },
      { status: 500 }
    );
  }
}
