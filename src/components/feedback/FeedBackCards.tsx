
const FeedBackCards = ({ feedback }: any) => {
    return (
        <div className="">
            {feedback.map((i: any, key: any) => (
                <div key={key} className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                        Feedback Summary
                    </h2>

                    <div className="space-y-3">
                        <p className="text-gray-600">
                            <strong>UserID:</strong> {i.user_id}
                        </p>
                        <p className="text-gray-600">
                            <strong>MentorID:</strong> {i.mentor_id}
                        </p>
                        <p className="text-gray-600">
                            <strong>Milestone:</strong> {i.milestone}
                        </p>

                        <p className="text-gray-600">
                            <strong>Milestone Achieved:</strong>{" "}
                            {i.milestone_achieved ? "✅ Yes" : "❌ No"}
                        </p>

                        <p className="text-gray-600">
                            <strong>Next Steps Identified:</strong>{" "}
                            {i.next_steps_identified ? "✅ Yes" : "❌ No"}
                        </p>

                        <p className="text-gray-600">
                            <strong>Meeting Progress:</strong> {i.progress_rating} ⭐⭐⭐⭐☆ (4/5)
                        </p>

                        <p className="text-gray-600">
                            <strong>Mentor Responsibility Fulfilled:</strong>{" "}
                            {i.mentor_responsibility ? "✅ Yes" : "❌ No"}
                        </p>

                        <p className="text-gray-600">
                            <strong>User Responsibility Fulfilled:</strong>{" "}
                            {i.user_responsibility ? "✅ Yes" : "❌ No"}
                        </p>
                    </div>

                    <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default FeedBackCards;
